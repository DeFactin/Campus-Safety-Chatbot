using SafetyChatbot.Domain.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace SafetyChatbot.Infrastructure.Repositories
{
    public interface IIncidentReportRepository
    {

        IncidentReport GetSingle(int id);
        void Add(IncidentReport item);
        void Delete(int id);
        IncidentReport Update(int id, IncidentReport item);
        List<IncidentReport> GetAll();
    }
}
