using Microsoft.EntityFrameworkCore;
using SafetyChatbot.Models;

public class ApplicationDbContext : DbContext
{
    public ApplicationDbContext(DbContextOptions<ApplicationDbContext> options)
        : base(options)
    {
    }

    public DbSet<SafetyRegulation> SafetyRegulations { get; set; }
}