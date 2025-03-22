using Microsoft.AspNetCore.Mvc;
using Mission11_Backend.Data;
using Mission11_Backend.Models;
using System.Linq;

namespace Mission11_Backend.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class BooksController : ControllerBase
    {
        private readonly ApplicationDbContext _context;

        public BooksController(ApplicationDbContext context)
        {
            _context = context;
        }

        [HttpGet]
        public IActionResult GetBooks(int page = 1, int pageSize = 5, string sortOrder = "asc")
        {
            var booksQuery = _context.Books.AsQueryable();

            // Sorting by Title (you can change to another field if needed)
            booksQuery = sortOrder.ToLower() == "desc"
                ? booksQuery.OrderByDescending(b => b.Title)
                : booksQuery.OrderBy(b => b.Title);

            var totalBooks = booksQuery.Count();
            var books = booksQuery
                .Skip((page - 1) * pageSize)
                .Take(pageSize)
                .ToList();

            return Ok(new { totalBooks, books });
        }
    }
}
