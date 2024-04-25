const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

exports.getVisitStatistics = async (req, res) => {
  const path = req.params.path;
  try {
    // Find or create the visit statistics
    let pageVisit = await prisma.page_Visitor_Counter.findFirst({
      where: { path: path },
    });

    if (!pageVisit) {
      // Create a new record for the page visit if it doesn't exist
      pageVisit = await prisma.page_Visitor_Counter.create({
        data: {
          path: path,
          totalVisits: 1,
          todayVisits: 1,
          lastUpdated: new Date(),
        },
      });
    } else {
      // Increment total and today's visits count if the record exists
      pageVisit = await prisma.page_Visitor_Counter.update({
        where: { id: pageVisit.id },
        data: {
          totalVisits: { increment: 1 },
          todayVisits: { increment: 1 },
        },
      });
    }

    // Check if the last updated date is today, if not reset today's visits count
    const today = new Date().toISOString().slice(0, 10);
    const lastUpdated = pageVisit.lastUpdated.toISOString().slice(0, 10);
    if (lastUpdated !== today) {
      await prisma.page_Visitor_Counter.update({
        where: { id: pageVisit.id },
        data: { todayVisits: 0, lastUpdated: today },
      });
    }

    // Return the JSON response
    return res.status(200).json({
      success: true,
      path: pageVisit.path,
      total_visits: pageVisit.totalVisits,
      today_visits: pageVisit.todayVisits,
    });
  } catch (error) {
    // Log and handle exceptions
    console.error("Error in getVisitStatistics:", error);
    return res.status(500).json({
      success: false,
      message: error.message,
    });
  } finally {
    await prisma.$disconnect();
  }
};

// exports.getVisitStatistics = async (req, res) => {
//   console.log(req.params.path);
//   //// query all data

//   try {
//     const allPageVisits = await prisma.page_Visitor_Counter.findMany();

//     if (!allPageVisits || allPageVisits.length === 0) {
//       console.log("No page visits found");
//       return res.status(404).json({ error: "Page visits not found" });
//     }

//     console.log("All page visits retrieved successfully:", allPageVisits);
//     res.status(200).json({ message: "Success", allPageVisits });
//   } catch (error) {
//     console.error("Error fetching page visits:", error);
//     res.status(500).json({ error: "Internal server error" });
//   }
// };
