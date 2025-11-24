import { Liveblocks } from '@liveblocks/node';

// Use mock secret key for local development
const secretKey = process.env.LIVEBLOCKS_SECRET_KEY || 'sk_dev_mock_secret_key_for_local_development_only';

const liveblocks = new Liveblocks({
  secret: secretKey,
});

export async function POST(req: Request) {
  const { room } = await req.json();

  // Mock anonymous user for collaboration
  const mockUser = {
    id: 'anonymous-user',
    name: 'Anonymous User',
    avatar: '',
    color: '#3b82f6',
  };

  /**
   * Prepare a new session to authorize user access to Liveblocks.
   *
   * prepareSession is a core method in Liveblocks for creating and preparing user sessions. Its main purposes are:
   *  - Initialize a new real-time collaboration session
   *  - Establish a secure connection channel for the user
   *  - Prepare for subsequent user authentication and room access
   */
  const session = liveblocks.prepareSession(mockUser.id, {
    userInfo: {
      name: mockUser.name,
      avatar: mockUser.avatar,
      color: mockUser.color,
    },
  });

  // Grant user full access to the specific room
  session.allow(room, session.FULL_ACCESS);
  /**
   * Generate access token: Return authorization status and access token
   *
   * Calling this function authorizes the session to access Liveblocks.
   * Note that this returns a Liveblocks "access token".
   * Anyone with this access token can access the allowed resources.
   */
  const { status, body } = await session.authorize();

  return new Response(body, { status });
}

/**
 * Next.js API Route Examples:
 *
 * POST(req: NextApiRequest, res: NextApiResponse)
 *  Get data: const { room } = req.body
 *  Response: res.status(status).json(body)
 *
 * POST(req: Request, res: Response)
 *  Get data: const { room } = await req.json()
 *  Response: new Response(JSON.stringify({ message: 'Hello, World!' }), { status: 200 })
 *
 * In Next.js, the req and res object types depend on your API route context:
 *  - In API routes, req and res are NextRequest and NextResponse
 *  - In standard API routes, req and res are NextApiRequest and NextApiResponse
 *
 * Next.js API Route:
 *  import type { NextApiRequest, NextApiResponse } from 'next';
 *  export default function handler(req: NextApiRequest, res: NextApiResponse) {
 *    // req is NextApiRequest object
 *  }
 *
 * Standard API Route:
 *  
 *  Node HTTP server:
 *   res.writeHead(200, { 'Content-Type': 'application/json' });
     res.end(JSON.stringify({ message: 'Hello, World!' }));
 * 
 *  Example: Using XML HTTP Request or Fetch API
 *  const response = await fetch('/api/liveblocks-auth', {
 *    method: 'POST',
 *    body: JSON.stringify({ room: '123' }),
 *  });
 *  const data = await response.json();
 *  console.log(data);
 */
