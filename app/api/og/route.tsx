import { ImageResponse } from '@vercel/og';
import { NextRequest } from 'next/server';

export const runtime = 'edge';
export const revalidate = 0;

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;

  // Get data from URL
  const name = searchParams.get('name') ?? 'Player Name';
  const position = searchParams.get('position') ?? 'Midfielder';
  const club = searchParams.get('club') ?? 'Club Name';
  const prospectNo = searchParams.get('prospect') ?? '01';
  const games = searchParams.get('games') ?? '0';
  const goals = searchParams.get('goals') ?? '0';
  const assists = searchParams.get('assists') ?? '0';
  const imageUrl = searchParams.get('image') ?? '';
  const bio = searchParams.get('bio') ?? '';
  const achievement = searchParams.get('achievement') ?? '';
  const rating = searchParams.get('rating') ?? '4.9';

  return new ImageResponse(
    (
      <div
        style={{
          width: '1200px',
          height: '630px',
          background: '#1a1a1a',
          display: 'flex',
          fontFamily: 'sans-serif',
          color: 'white',
          padding: '40px',
          gap: '30px',
        }}
      >
        {/* Left: Player Photo Card */}
        <div style={{
          width: '360px',
          background: '#111',
          borderRadius: '16px',
          overflow: 'hidden',
          position: 'relative',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'flex-end',
        }}>
          {/* Prospect badge */}
          <div style={{
            position: 'absolute', top: '16px', left: '16px',
            background: '#c8f135', color: '#000',
            fontSize: '14px', fontWeight: 'bold',
            padding: '4px 12px', borderRadius: '6px',
          }}>
            PROSPECT #{prospectNo}
          </div>

          {/* Player image */}
          {imageUrl && (
            <img
              src={imageUrl} 
              style={{ position: 'absolute', top: 0, left: 0, width: '100%', height: '100%', objectFit: 'cover' }}
            />
          )}

          {/* Name overlay */}
          <div style={{
            position: 'relative', zIndex: 2,
            background: 'linear-gradient(transparent, rgba(0,0,0,0.85))',
            padding: '60px 20px 20px',
            display: 'flex', flexDirection: 'column',
          }}>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: 'white' }}>
              {name.split(' ')[0]}
            </span>
            <span style={{ fontSize: '28px', fontWeight: 'bold', color: '#c8f135' }}>
              {name.split(' ').slice(1).join(' ')}
            </span>
            <span style={{ fontSize: '14px', color: '#aaa', marginTop: '4px' }}>
              {position} | {club}
            </span>
          </div>
        </div>

        {/* Right: Stats */}
        <div style={{ flex: 1, display: 'flex', flexDirection: 'column', gap: '20px' }}>
          {/* Header */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
            <div style={{
              width: '32px', height: '32px', border: '2px solid #c8f135',
              borderRadius: '6px', display: 'flex', alignItems: 'center', justifyContent: 'center',
            }}>
              <div style={{ width: '14px', height: '14px', background: '#c8f135' }} />
            </div>
            <span style={{ fontSize: '24px', fontWeight: 'bold', letterSpacing: '2px' }}>GoElite</span>
          </div>

          {/* Stats Row */}
          <div style={{ display: 'flex', gap: '12px' }}>
            {[
              { label: 'Games', value: games },
              { label: 'Goals', value: goals },
              { label: 'Assists', value: assists },
            ].map(stat => (
              <div key={stat.label} style={{
                flex: 1, background: '#2a2a2a', borderRadius: '10px',
                padding: '12px', display: 'flex', flexDirection: 'column', alignItems: 'center',
              }}>
                <span style={{ fontSize: '13px', color: '#888' }}>{stat.label}</span>
                <span style={{ fontSize: '28px', fontWeight: 'bold' }}>{stat.value}</span>
              </div>
            ))}
          </div>

          {/* Rating */}
          <div style={{
            background: '#2a2a2a', borderRadius: '10px', padding: '16px',
            display: 'flex', gap: '30px',
          }}>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{rating}</span>
              <span style={{ color: '#c8f135', fontSize: '20px' }}>★★★★★</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Team Vote</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <span style={{ fontSize: '30px', fontWeight: 'bold' }}>{rating}</span>
              <span style={{ color: '#c8f135', fontSize: '20px' }}>★★★★★</span>
              <span style={{ fontSize: '12px', color: '#888' }}>Academy Vote</span>
            </div>
          </div>

          {/* Achievement */}
          {achievement && (
            <div style={{
              background: '#2a2a2a', borderRadius: '10px', padding: '16px',
              display: 'flex', alignItems: 'center', gap: '10px',
            }}>
              <span style={{ fontSize: '24px' }}>🏆</span>
              <div>
                <span style={{ fontSize: '12px', color: '#c8f135', letterSpacing: '1px' }}>ACHIEVEMENT</span>
                <p style={{ margin: 0, fontSize: '16px' }}>{achievement}</p>
              </div>
            </div>
          )}

          {/* Bio */}
          {bio && (
            <div style={{
              background: '#2a2a2a', borderRadius: '10px', padding: '16px',
              flex: 1,
            }}>
              <span style={{ fontSize: '12px', color: '#888', letterSpacing: '1px' }}>PLAYER BIO</span>
              <p style={{ margin: '6px 0 0', fontSize: '14px', color: '#ccc', lineHeight: '1.5' }}>{bio}</p>
            </div>
          )}
        </div>
      </div>
    ),
    { width: 1200, height: 630 , headers: {
        'Cache-Control': 'no-store, no-cache, must-revalidate',
      },}
  );
}