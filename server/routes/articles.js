import { Router } from "express";
import prisma from "./lib/db.js";

const router = Router();

const getArticles = async (q, page, pageSize, sort, sortDirection) => {
  const where = q
    ? {
        OR: [{ title: { contains: q } }, { description: { contains: q } }],
      }
    : {};
  const articlesPromise = prisma.article.findMany({
    where,
    skip: (page - 1) * pageSize,
    take: pageSize,
    orderBy: { [sort]: sortDirection },
  });
  const totalArticlesPromise = prisma.article.count({ where });
  const [articles, totalArticles] = await Promise.all([
    articlesPromise,
    totalArticlesPromise,
  ]);
  return {
    data: articles,
    pagination: {
      total: totalArticles,
      page,
      pageSize,
      totalPages: Math.ceil(totalArticles / pageSize),
    },
  };
};

router.get("/", async (req, res) => {
  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 12;
  const sort = req.query.sort || "createdAt";
  const sortDirection = req.query.sortDirection || "desc";

  try {
    res.json(await getArticles("", page, pageSize, sort, sortDirection));
  } catch (error) {
    console.error("Error fetching articles:", error);
    res.status(500).json({ error: "Failed to fetch articles" });
  }
});

router.get("/search", async (req, res) => {
  const { q } = req.query;

  if (!q) {
    return res.status(400).json({ error: "Query parameter 'q' is required" });
  }

  const page = parseInt(req.query.page, 10) || 1;
  const pageSize = parseInt(req.query.pageSize, 10) || 12;
  const sort = req.query.sort || "createdAt";
  const sortDirection = req.query.sortDirection || "desc";

  try {
    res.json(await getArticles(q, page, pageSize, sort, sortDirection));
  } catch (error) {
    console.error("Error searching articles:", error);
    res.status(500).json({ error: "Failed to search articles" });
  }
});

router.get("/:articleId", async (req, res) => {
  const { articleId } = req.params;
  try {
    const article = await prisma.article.findUnique({
      where: { id: parseInt(articleId) },
    });
    if (!article) {
      return res.status(404).json({ error: "Article not found" });
    }
    res.json(article);
  } catch (error) {
    console.error("Error fetching article:", error);
    res.status(500).json({ error: "Failed to fetch article" });
  }
});

export default router;
