using SafetyChatbot.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace SafetyChatbot.Infrastructure.Repositories
{

   public class IncidentReportSqlRepository : IIncidentReportRepository
    {
        private readonly ApplicationDbContext _applicationDbContext;

        public IncidentReportSqlRepository(ApplicationDbContext applicationDbContext)
        {
            _applicationDbContext = applicationDbContext;
        }

        public IncidentReport GetSingle(int id)
        {
            return _applicationDbContext.IncidentReports.FirstOrDefault(x => x.Id == id);
        }

        public void Add(IncidentReport item)
        {
            _applicationDbContext.IncidentReports.Add(item);
            _applicationDbContext.SaveChanges();
        }

        public void Delete(int id)
        {
            IncidentReport incidentReport = GetSingle(id);
            _applicationDbContext.IncidentReports.Remove(incidentReport);
            _applicationDbContext.SaveChanges();
        }

        public IncidentReport Update(int id, IncidentReport item)
        {
            _applicationDbContext.IncidentReports.Update(item);
            _applicationDbContext.SaveChanges();
            return item;
        }

        public List<IncidentReport> GetAll()
        {

            return _applicationDbContext.IncidentReports.ToList();
        }
    }
}
