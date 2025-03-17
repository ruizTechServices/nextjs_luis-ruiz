export async function GET() {
  // In a real application, you would fetch this data from your database
  // For now, we'll simulate some dynamic data
  const stats = {
    activeProjects: Math.floor(Math.random() * 15) + 8, // Random number between 8-22
    tasksToday: Math.floor(Math.random() * 8) + 3, // Random number between 3-10
    lastUpdated: new Date().toISOString()
  };

  return Response.json(stats);
}


//figure out what data I need to return to identify what is a project.