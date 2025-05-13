import React, { useEffect, useState } from 'react';
import {
    Box,
    Paper,
    Typography,
    Table,
    TableContainer,
    TableHead,
    TableBody,
    TableRow,
    TableCell,
    Chip,
    IconButton,
    Tooltip,
    TablePagination,
    TextField,
    InputAdornment,
    MenuItem,
    Select,
    FormControl,
    InputLabel,
    SelectChangeEvent,
    useTheme,
    CircularProgress
} from '@mui/material';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AutorenewIcon from '@mui/icons-material/Autorenew';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import HelpOutlineIcon from '@mui/icons-material/HelpOutline';

import { Search, Eye, AlertCircle } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Incident, IncidentStatus, SeverityLevel } from '../../types/incident';
import { getIncidents } from '../../services/ApiService';

const IncidentsList: React.FC = () => {
    const theme = useTheme();
    const navigate = useNavigate();

    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    const [searchTerm, setSearchTerm] = useState('');
    const [statusFilter, setStatusFilter] = useState<string>('all');
    const [severityFilter, setSeverityFilter] = useState<string>('all');

    const [incidents, setIncidents] = useState<Incident[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const data = await getIncidents();
                setIncidents(data);
            } catch (error) {
                console.error('Failed to load incidents:', error);
                setError('Failed to load incidents.');
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const handleViewClick = (incidentId: number) => {
        navigate(`/admin/${incidentId}`);
    };

    const handleChangePage = (event: unknown, newPage: number) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event: React.ChangeEvent<HTMLInputElement>) => {
        setRowsPerPage(parseInt(event.target.value, 10));
        setPage(0);
    };

    const handleSearchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
        setSearchTerm(event.target.value);
        setPage(0);
    };

    const handleStatusFilterChange = (event: SelectChangeEvent) => {
        setStatusFilter(event.target.value);
        setPage(0);
    };

    const handleSeverityFilterChange = (event: SelectChangeEvent) => {
        setSeverityFilter(event.target.value);
        setPage(0);
    };

    const getStatusColor = (status: IncidentStatus) => {
        switch (status) {
            case 'Pending': return theme.palette.warning.main;
            case 'In Progress': return theme.palette.primary.main;
            case 'Resolved': return theme.palette.success.main;
            default: return theme.palette.grey[500];
        }
    };


     

    const getStatusIcon = (status: IncidentStatus) => {
        const color = getStatusColor(status);
        switch (status) {
            case 'Pending':
                return <AccessTimeIcon sx={{ color }} />;
            case 'In Progress':
                return <AutorenewIcon sx={{ color }} />;
            case 'Resolved':
                return <CheckCircleIcon sx={{ color }} />;
            default:
                return <HelpOutlineIcon sx={{ color }} />;
        }
    };


    const getSeverityColor = (severity: SeverityLevel) => {
        switch (severity) {
            case 'high':
                return theme.palette.error.main;
            case 'medium':
                return theme.palette.warning.main;
            case 'low':
                return theme.palette.success.main;
            default:
                return theme.palette.grey[500];
        }
    };


    const normalize = (str: string) => str.toLowerCase().replace(/\s+/g, '_');

    const filteredIncidents = incidents.filter((incident) => {
        const matchesSearch = [incident.incidentType, incident.location, incident.description]
            .some(field => field?.toLowerCase().includes(searchTerm.toLowerCase()));

        const matchesStatus = statusFilter === 'all' || normalize(incident.status) === statusFilter;
        const matchesSeverity = severityFilter === 'all' || normalize(incident.severity) === severityFilter;

        return matchesSearch && matchesStatus && matchesSeverity;
    });

    const paginatedIncidents = filteredIncidents.slice(
        page * rowsPerPage,
        page * rowsPerPage + rowsPerPage
    );

    if (loading) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <CircularProgress />
            </Box>
        );
    }

    if (error) {
        return (
            <Box display="flex" justifyContent="center" p={4}>
                <Typography color="error">{error}</Typography>
            </Box>
        );
    }

    return (
        <Paper elevation={0} sx={{ p: 3, borderRadius: 2, boxShadow: '0 4px 20px rgba(0,0,0,0.08)' }}>
            <Typography variant="h6" fontWeight={600} gutterBottom>
                Incident Reports
            </Typography>

            <Box sx={{ mb: 3, display: 'flex', flexDirection: { xs: 'column', md: 'row' }, gap: 2 }}>
                <TextField
                    placeholder="Search incidents..."
                    value={searchTerm}
                    onChange={handleSearchChange}
                    variant="outlined"
                    size="small"
                    sx={{ flex: 1 }}
                    InputProps={{
                        startAdornment: (
                            <InputAdornment position="start">
                                <Search size={20} />
                            </InputAdornment>
                        ),
                    }}
                />

                <Box sx={{ display: 'flex', gap: 2 }}>
                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="status-filter-label">Status</InputLabel>
                        <Select
                            labelId="status-filter-label"
                            value={statusFilter}
                            label="Status"
                            onChange={handleStatusFilterChange}
                        >
                            <MenuItem value="all">All Statuses</MenuItem>
                            <MenuItem value="pending">Pending</MenuItem>
                            <MenuItem value="in_progress">In Progress</MenuItem>
                            <MenuItem value="resolved">Resolved</MenuItem>
                        </Select>
                    </FormControl>

                    <FormControl size="small" sx={{ minWidth: 120 }}>
                        <InputLabel id="severity-filter-label">Severity</InputLabel>
                        <Select
                            labelId="severity-filter-label"
                            value={severityFilter}
                            label="Severity"
                            onChange={handleSeverityFilterChange}
                        >
                            <MenuItem value="all">All Severities</MenuItem>
                            <MenuItem value="high">High</MenuItem>
                            <MenuItem value="medium">Medium</MenuItem>
                            <MenuItem value="low">Low</MenuItem>
                        </Select>
                    </FormControl>

                </Box>
            </Box>

            <TableContainer>
                <Table sx={{ minWidth: 650 }} aria-label="incidents table">
                    <TableHead>
                        <TableRow>
                            <TableCell>ID</TableCell>
                            <TableCell>Type</TableCell>
                            <TableCell>Reported By</TableCell>
                            <TableCell>Location</TableCell>
                            <TableCell>Date</TableCell>
                            <TableCell>Severity</TableCell>
                            <TableCell>Status</TableCell>
                            <TableCell>Description</TableCell>
                            <TableCell align="right">Actions</TableCell>
                        </TableRow>
                    </TableHead>
                    <TableBody>
                        {paginatedIncidents.length > 0 ? (
                            paginatedIncidents.map((incident) => (
                                <TableRow
                                    key={incident.id}
                                    sx={{
                                        '&:hover': {
                                            backgroundColor: 'rgba(0, 0, 0, 0.04)',
                                            cursor: 'pointer'
                                        }
                                    }}
                                >
                                    <TableCell>{incident.id}</TableCell>
                                    <TableCell>{incident.incidentType}</TableCell>
                                    <TableCell>{incident.reportedBy || 'N/A'}</TableCell>
                                    <TableCell>{incident.location}</TableCell>
                                    <TableCell>
                                        {new Date(incident.date).toLocaleDateString(undefined, {
                                            year: 'numeric',
                                            month: 'short',
                                            day: 'numeric',
                                            hour: '2-digit',
                                            minute: '2-digit',
                                        })}
                                    </TableCell>
                                    <TableCell>
                                        <Chip
                                            label={incident.severity}
                                            size="small"
                                            sx={{
                                                backgroundColor: getSeverityColor(incident.severity),
                                                color: '#fff',
                                                textTransform: 'capitalize',
                                            }}
                                        />
                                    </TableCell>
                                    
                                    <TableCell>
                                       
                                            <Box display="flex" alignItems="center" gap={1}>
                                            
                                            <Typography variant="body2">{incident.status}</Typography>
                                            {getStatusIcon(incident.status)}
                                        </Box>

                                        
                                    </TableCell>
                                    <TableCell sx={{ maxWidth: 200 }}>
                                        <Typography
                                            variant="body2"
                                            noWrap
                                            sx={{ textOverflow: 'ellipsis', overflow: 'hidden', whiteSpace: 'nowrap' }}
                                        >
                                            {incident.description}
                                        </Typography>
                                    </TableCell>
                                    <TableCell align="right">
                                        <Tooltip title="View Details">
                                            <IconButton
                                                onClick={() => handleViewClick(incident.id)}
                                                size="small"
                                                color="primary"
                                            >
                                                <Eye size={18} />
                                            </IconButton>
                                        </Tooltip>
                                    </TableCell>
                                </TableRow>
                            ))
                        ) : (
                            <TableRow>
                                <TableCell colSpan={7} align="center" sx={{ py: 3 }}>
                                    <Typography variant="body1" color="text.secondary">
                                        No incidents found matching your filters.
                                    </Typography>
                                </TableCell>
                            </TableRow>
                        )}
                    </TableBody>
                </Table>
            </TableContainer>

            <TablePagination
                component="div"
                count={filteredIncidents.length}
                page={page}
                onPageChange={handleChangePage}
                rowsPerPage={rowsPerPage}
                onRowsPerPageChange={handleChangeRowsPerPage}
                rowsPerPageOptions={[5, 10, 25]}
            />
        </Paper>
    );
};

export default IncidentsList;
