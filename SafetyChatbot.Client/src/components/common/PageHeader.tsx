import React from 'react';
import { Box, Typography, Breadcrumbs, Link, useTheme, useMediaQuery } from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeaderProps {
    title: string;
    subtitle?: string;
    breadcrumbs?: Array<{
        name: string;
        path?: string;
    }>;
}

const PageHeader: React.FC<PageHeaderProps> = ({ title, subtitle, breadcrumbs }) => {
    const theme = useTheme();
    const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

    return (
        <Box sx={{ mb: 4 }}>
            {breadcrumbs && breadcrumbs.length > 0 && (
                <Breadcrumbs
                    separator={<ChevronRight size={16} />}
                    aria-label="breadcrumb"
                    sx={{ mb: 2 }}
                >
                    {breadcrumbs.map((crumb, index) => {
                        const isLast = index === breadcrumbs.length - 1;

                        return isLast ? (
                            <Typography key={index} color="text.primary" fontWeight={500}>
                                {crumb.name}
                            </Typography>
                        ) : (
                            <Link
                                key={index}
                                component={RouterLink}
                                to={crumb.path || '#'}
                                underline="hover"
                                color="inherit"
                            >
                                {crumb.name}
                            </Link>
                        );
                    })}
                </Breadcrumbs>
            )}

            <Typography
                variant={isMobile ? "h4" : "h3"}
                component="h1"
                fontWeight={700}
                color="primary.main"
            >
                {title}
            </Typography>

            {subtitle && (
                <Typography
                    variant="body1"
                    color="text.secondary"
                    sx={{ mt: 1 }}
                >
                    {subtitle}
                </Typography>
            )}
        </Box>
    );
};

export default PageHeader;