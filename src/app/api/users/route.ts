import { NextRequest, NextResponse } from 'next/server'

import type { UserResponse, User, UIUser, UsersApiResponse } from '@/shared/types/user'

const BASE_URL = 'https://randomuser.me/api'

export async function GET(request: NextRequest) {
  try {
    const searchParams = request.nextUrl.searchParams
    const count = searchParams.get('count') || '6'
    const page = searchParams.get('page') || '1'

    const response = await fetch(
      `${BASE_URL}?results=${count}&page=${page}`
    )

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data: UserResponse = await response.json()

    // Transform to our UI format
    const users: UIUser[] = data.results.map((user: User) => ({
      id: user.login.uuid,
      name: `${user.name.first} ${user.name.last}`,
      gender: user.gender.charAt(0).toUpperCase() + user.gender.slice(1),
      email: user.email,
      location: `${user.location.city}, ${user.location.country}`,
      avatar: user.picture.large,
      coordinates: {
        latitude: parseFloat(user.location.coordinates.latitude),
        longitude: parseFloat(user.location.coordinates.longitude),
      },
    }))

    return NextResponse.json({
      users,
      pagination: {
        page: parseInt(page),
        count: parseInt(count),
        total: data.info.results
      }
    } as UsersApiResponse)
  } catch (error) {
    console.error('Error fetching users:', error)
    return NextResponse.json(
      { error: 'Failed to fetch users' },
      { status: 500 }
    )
  }
}
