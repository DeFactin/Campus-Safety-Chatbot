using AutoMapper;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SafetyChatbot.Application.Services;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Infrastructure.Repositories;
using System.Collections.Generic;
using System.Linq;



    public class IncidentReportService : IIncidentReportService
    {
        private readonly IIncidentReportRepository _repository;
        private readonly IMapper _mapper;

        public IncidentReportService(IIncidentReportRepository repository, IMapper mapper)
        {
            _repository = repository;
            _mapper = mapper;
        }

        public (IEnumerable<IncidentReportDto> Reports, bool Empty) GetAll()
        {
            var reports = _repository.GetAll();
            if (reports == null || !reports.Any())
                return (Enumerable.Empty<IncidentReportDto>(), true);

            var dtos = reports.Select(_mapper.Map<IncidentReportDto>);
            return (dtos, false);
        }

        public (IncidentReportDto? Report, bool NotFound) GetSingle(int id)
        {
            if (id < 0) return (null, true);

            var report = _repository.GetSingle(id);
            if (report == null) return (null, true);

            return (_mapper.Map<IncidentReportDto>(report), false);
        }

        public (IncidentReportDto? Report, bool Created, string? Error) Add(SubmitIncidentReportDto dto)
        {
            if (dto == null)
                return (null, false, "Invalid input");

            var entity = _mapper.Map<IncidentReport>(dto);
            _repository.Add(entity);

            var created = _repository.GetSingle(entity.Id);
            if (created == null)
                return (null, false, "Creation failed");

            return (_mapper.Map<IncidentReportDto>(created), true, null);
        }

        public (IncidentReportDto? Report, bool NotFound, string? Error) Update(int id, IncidentReportDto dto)
        {
            var existing = _repository.GetSingle(id);
            if (existing == null)
                return (null, true, null);

            _mapper.Map(dto, existing);
            var updated = _repository.Update(id, existing);

            return (_mapper.Map<IncidentReportDto>(updated), false, null);
        }

        public (IncidentReportDto? Report, bool NotFound, string? Error) Patch(int id, JsonPatchDocument<IncidentReportDto> patchDoc, ModelStateDictionary modelState)
        {
            if (patchDoc == null)
                return (null, false, "Invalid patch document");

            var existing = _repository.GetSingle(id);
            if (existing == null)
                return (null, true, null);

            var dto = _mapper.Map<IncidentReportDto>(existing);
            patchDoc.ApplyTo(dto);

            if (!modelState.IsValid)
                return (null, false, "Invalid model state");

            _mapper.Map(dto, existing);
            var updated = _repository.Update(id, existing);

            return (_mapper.Map<IncidentReportDto>(updated), false, null);
        }

        public (bool NotFound, string? Error) Delete(int id)
        {
            var existing = _repository.GetSingle(id);
            if (existing == null)
                return (true, null);

            _repository.Delete(id);
            return (false, null);
        }
    }