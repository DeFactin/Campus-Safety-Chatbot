using Xunit;
using Moq;
using AutoMapper;
using System.Collections.Generic;
using Microsoft.AspNetCore.JsonPatch;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using SafetyChatbot.Application.Dtos;
using SafetyChatbot.Application;
using SafetyChatbot.Application.Services;
using SafetyChatbot.Domain.Models;
using SafetyChatbot.Infrastructure.Repositories;
using System.Linq;

namespace SafetyChatbot.Tests
{
    public class IncidentReportServiceTests
    {
        private readonly Mock<IIncidentReportRepository> _mockRepo;
        private readonly Mock<IMapper> _mockMapper;
        private readonly IncidentReportService _service;

        public IncidentReportServiceTests()
        {
            _mockRepo = new Mock<IIncidentReportRepository>();
            _mockMapper = new Mock<IMapper>();
            _service = new IncidentReportService(_mockRepo.Object, _mockMapper.Object);
        }

        [Fact]
        public void GetAll_ReturnsMappedDtos()
        {
            // Arrange
            var reports = new List<IncidentReport> { new IncidentReport { Id = 1 } };
            var dtos = new List<IncidentReportDto> { new IncidentReportDto { Id = 1 } };
            _mockRepo.Setup(r => r.GetAll()).Returns(reports);
            _mockMapper.Setup(m => m.Map<IncidentReportDto>(It.IsAny<IncidentReport>())).Returns(dtos.First());

            // Act
            var result = _service.GetAll();

            // Assert
            Assert.False(result.Empty);
            Assert.Single(result.Reports);
        }

        [Fact]
        public void GetSingle_ExistingId_ReturnsDto()
        {
            var report = new IncidentReport { Id = 1 };
            var dto = new IncidentReportDto { Id = 1 };
            _mockRepo.Setup(r => r.GetSingle(1)).Returns(report);
            _mockMapper.Setup(m => m.Map<IncidentReportDto>(report)).Returns(dto);

            var result = _service.GetSingle(1);

            Assert.False(result.NotFound);
            Assert.Equal(1, result.Report.Id);
        }

        [Fact]
        public void GetSingle_NonexistentId_ReturnsNotFound()
        {
            _mockRepo.Setup(r => r.GetSingle(1)).Returns((IncidentReport)null);

            var result = _service.GetSingle(1);

            Assert.True(result.NotFound);
        }

        [Fact]
        public void Add_ValidInput_ReturnsCreatedDto()
        {
            var dto = new SubmitIncidentReportDto { Description = "Test" };
            var entity = new IncidentReport { Id = 1 };
            var createdDto = new IncidentReportDto { Id = 1 };

            _mockMapper.Setup(m => m.Map<IncidentReport>(dto)).Returns(entity);
            _mockRepo.Setup(r => r.Add(entity));
            _mockRepo.Setup(r => r.GetSingle(entity.Id)).Returns(entity);
            _mockMapper.Setup(m => m.Map<IncidentReportDto>(entity)).Returns(createdDto);

            var result = _service.Add(dto);

            Assert.True(result.Created);
            Assert.Equal(1, result.Report.Id);
        }

        [Fact]
        public void Update_ExistingId_UpdatesAndReturnsDto()
        {
            var existing = new IncidentReport { Id = 1 };
            var dto = new IncidentReportDto { Id = 1 };

            _mockRepo.Setup(r => r.GetSingle(1)).Returns(existing);
            _mockMapper.Setup(m => m.Map(dto, existing));
            _mockRepo.Setup(r => r.Update(1, existing)).Returns(existing);
            _mockMapper.Setup(m => m.Map<IncidentReportDto>(existing)).Returns(dto);

            var result = _service.Update(1, dto);

            Assert.False(result.NotFound);
            Assert.Equal(1, result.Report.Id);
        }

        [Fact]
        public void Patch_ValidPatch_UpdatesEntity()
        {
            var existing = new IncidentReport { Id = 1 };
            var dto = new IncidentReportDto { Id = 1 };
            var patchDoc = new JsonPatchDocument<IncidentReportDto>();
            var modelState = new ModelStateDictionary();

            _mockRepo.Setup(r => r.GetSingle(1)).Returns(existing);
            _mockMapper.Setup(m => m.Map<IncidentReportDto>(existing)).Returns(dto);
            _mockMapper.Setup(m => m.Map(dto, existing));
            _mockRepo.Setup(r => r.Update(1, existing)).Returns(existing);
            _mockMapper.Setup(m => m.Map<IncidentReportDto>(existing)).Returns(dto);

            var result = _service.Patch(1, patchDoc, modelState);

            Assert.False(result.NotFound);
        }

        [Fact]
        public void Delete_ExistingId_DeletesEntity()
        {
            var existing = new IncidentReport { Id = 1 };
            _mockRepo.Setup(r => r.GetSingle(1)).Returns(existing);
            _mockRepo.Setup(r => r.Delete(1));

            var result = _service.Delete(1);

            Assert.False(result.NotFound);
        }
    }
}
