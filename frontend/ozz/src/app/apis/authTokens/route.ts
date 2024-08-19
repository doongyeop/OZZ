/* eslint-disable import/prefer-default-export */

import { NextResponse } from 'next/server'
import cookie from 'cookie'

export async function GET(request: Request) {
  const cookieHeader = request.headers.get('cookie') || ''
  const cookies = cookie.parse(cookieHeader)

  const accessToken = cookies.access
  const refreshToken = cookies.refresh

  // console.log('Access Token:', accessToken)
  // console.log('Refresh Token:', refreshToken)

  if (accessToken && refreshToken) {
    return NextResponse.json({ accessToken, refreshToken })
  }
  return NextResponse.json({ message: 'Tokens not found' }, { status: 404 })
}
