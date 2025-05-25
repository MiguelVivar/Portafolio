// API Route para obtener lo que estás escuchando en Spotify
import { NextResponse } from 'next/server';

// Interfaces para tipar la respuesta de Spotify
interface SpotifyArtist {
  name: string;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyImage {
  url: string;
  height: number;
  width: number;
}

interface SpotifyAlbum {
  name: string;
  images: SpotifyImage[];
  external_urls: {
    spotify: string;
  };
}

interface SpotifyTrack {
  name: string;
  artists: SpotifyArtist[];
  album: SpotifyAlbum;
  duration_ms: number;
  external_urls: {
    spotify: string;
  };
}

interface SpotifyPlaybackState {
  is_playing: boolean;
  progress_ms: number;
  item: SpotifyTrack;
}

export async function GET() {
  // Debes obtener estas credenciales en el Spotify Developer Dashboard
  // https://developer.spotify.com/dashboard/
  const CLIENT_ID = process.env.SPOTIFY_CLIENT_ID;
  const CLIENT_SECRET = process.env.SPOTIFY_CLIENT_SECRET;
  const REFRESH_TOKEN = process.env.SPOTIFY_REFRESH_TOKEN;
  
  // Si falta alguna credencial, devolvemos un error
  if (!CLIENT_ID || !CLIENT_SECRET || !REFRESH_TOKEN) {
    console.error('Faltan credenciales de Spotify:', { 
      hasClientId: Boolean(CLIENT_ID),
      hasClientSecret: Boolean(CLIENT_SECRET),
      hasRefreshToken: Boolean(REFRESH_TOKEN)
    });
    
    return NextResponse.json(
      {
        isPlaying: false,
        error: 'Missing Spotify credentials',
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }

  try {
    // Obtenemos primero un token de acceso usando el refresh token
    const authResponse = await fetch('https://accounts.spotify.com/api/token', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
        'Authorization': `Basic ${Buffer.from(`${CLIENT_ID}:${CLIENT_SECRET}`).toString('base64')}`
      },
      body: new URLSearchParams({
        grant_type: 'refresh_token',
        refresh_token: REFRESH_TOKEN
      })
    });

    const authData = await authResponse.json();

    if (!authResponse.ok) {
      console.error('Error al refrescar el token de Spotify:', authData);
      return NextResponse.json(
        {
          isPlaying: false,
          error: 'Failed to refresh access token',
          details: authData
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Con el token de acceso, obtenemos lo que está sonando actualmente
    const nowPlayingResponse = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      headers: {
        'Authorization': `Bearer ${authData.access_token}`
      }
    });

    // Si no hay respuesta o no está reproduciendo nada
    if (nowPlayingResponse.status === 204 || nowPlayingResponse.status > 400) {
      return NextResponse.json(
        {
          isPlaying: false,
          timestamp: new Date().toISOString()
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate', 
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    const nowPlaying = await nowPlayingResponse.json() as SpotifyPlaybackState;
    
    // Si no está reproduciendo nada, indicamos que no hay nada sonando
    if (!nowPlaying.is_playing) {
      return NextResponse.json(
        {
          isPlaying: false,
          timestamp: new Date().toISOString()
        },
        {
          status: 200,
          headers: {
            'Cache-Control': 'no-cache, no-store, must-revalidate',
            'Access-Control-Allow-Origin': '*'
          }
        }
      );
    }

    // Formateamos la respuesta con la información relevante
    const data = {
      isPlaying: nowPlaying.is_playing,
      title: nowPlaying.item.name,
      artist: nowPlaying.item.artists.map((artist: SpotifyArtist) => artist.name).join(', '),
      album: nowPlaying.item.album.name,
      albumImageUrl: nowPlaying.item.album.images[0].url,
      songUrl: nowPlaying.item.external_urls.spotify,
      progress: nowPlaying.progress_ms,
      duration: nowPlaying.item.duration_ms,
      timestamp: new Date().toISOString()
    };

    return NextResponse.json(data, {
      status: 200,
      headers: {
        // Sin caché para asegurarnos de que siempre tengamos datos actualizados
        'Cache-Control': 'no-cache, no-store, must-revalidate',
        'Access-Control-Allow-Origin': '*'
      }
    });
  } catch (error) {
    console.error('Error en la API de Spotify:', error);
    return NextResponse.json(
      {
        isPlaying: false,
        error: 'Error processing Spotify request',
        details: String(error)
      },
      {
        status: 200,
        headers: {
          'Cache-Control': 'no-cache, no-store, must-revalidate',
          'Access-Control-Allow-Origin': '*'
        }
      }
    );
  }
}