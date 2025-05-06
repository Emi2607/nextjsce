import { NextResponse } from 'next/server';
import { createTables } from '@/app/lib/schema';

export async function GET() {
  try {
    const result = await createTables();
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error al configurar la base de datos:', error);
    return NextResponse.json(
      { error: 'Error al configurar la base de datos' }, 
      { status: 500 }
    );
  }
}