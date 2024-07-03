using backend.Data;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using System.Linq;
using System.Threading.Tasks;

namespace backend.Controller
{
    [ApiController]
    [Route("api/[controller]")]
    public class ProductController : ControllerBase
    {
        private readonly StoreContext _context;

        public ProductController(StoreContext context)
        {
            _context = context;
        }

        [HttpGet("")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProducts([FromQuery] string sort = "asc", [FromQuery] int limit = 12)
        {
            var products = _context.Products.Include(p => p.Category);

            // Sort products based on the sort parameter
            var sortedProducts = sort.ToLower() == "desc"
                ? products.OrderByDescending(p => p.Price)
                : products.OrderBy(p => p.Price);

            // Limit the number of products
            var limitedProducts = await sortedProducts.Take(limit).ToListAsync();

            return Ok(limitedProducts);
        }


        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProduct(int id)
        {
            var product = await _context.Products.Include(p => p.Category)
                                                 .FirstOrDefaultAsync(p => p.Id == id);

            if (product == null)
            {
                return NotFound();
            }

            return product;
        }

        // GET: api/Products/category
        [HttpGet("category")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsCategory([FromQuery] string sort = "asc", [FromQuery] int limit = 12)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .ToListAsync();

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category);
        }

        // GET: api/Products/category/{categoryName}
        [HttpGet("category/{categoryName}")]
        public async Task<ActionResult<IEnumerable<Product>>> GetProductsByCategory(string categoryName)
        {
            var category = await _context.Categories
                .Include(c => c.Products)
                .FirstOrDefaultAsync(c => c.CategoryName.ToLower() == categoryName.ToLower());

            if (category == null)
            {
                return NotFound();
            }

            return Ok(category.Products);
        }
    }
}