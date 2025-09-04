// src/presentation/adapters/safeFetch.ts
export async function safeJSON<T>(input: RequestInfo, init: RequestInit = {}, schema?: any): Promise<T> {
  const ctrl = new AbortController();
  const CONST_TIMEOUT = 15000; // 15 seconds
  const id = setTimeout(() => ctrl.abort(), CONST_TIMEOUT);
  try {
    const res = await fetch(input, { ...init, signal: ctrl.signal, // cache config fuera
    });
    if (!res.ok) throw new Error(`HTTP_${res.status}`);
    const data = await res.json();
    return schema ? schema.parse(data) : data;
  } catch (e) {
    console.error('safeJSON error:', e);
    throw e;
  } finally {
    clearTimeout(id);
  }
}
