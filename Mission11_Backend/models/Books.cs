using System.ComponentModel.DataAnnotations;

namespace Mission11_Backend.Models
{
    public class Book
    {
        [Key]
        public int Id { get; set; }
        [Required]
        public string Title { get; set; }
        [Required]
        public string Author { get; set; }
        [Required]
        public string Publisher { get; set; }
        [Required]
        public string ISBN { get; set; }
        [Required]
        public string Category { get; set; }  // Classification/Category
        [Required]
        public int NumberOfPages { get; set; }
        [Required]
        public decimal Price { get; set; }
    }
}
