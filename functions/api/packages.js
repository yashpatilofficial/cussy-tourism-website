export async function onRequestGet(context) {
  try {
    const { env } = context;
    const { results } = await env.DB.prepare('SELECT * FROM packages').all();
    return new Response(JSON.stringify(results), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}

export async function onRequestPost(context) {
  try {
    const { request, env } = context;
    const body = await request.json();
    
    // Simple basic admin route for inserting
    const { id, category, img, dest, title, duration, tour_type, price, badge } = body;
    
    await env.DB.prepare(
      'INSERT INTO packages (id, category, img, dest, title, duration, tour_type, price, badge) VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?)'
    ).bind(id, category, img, dest, title, duration, tour_type, price, badge).run();
    
    return new Response(JSON.stringify({ success: true }), {
      headers: { 'Content-Type': 'application/json' }
    });
  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    });
  }
}
