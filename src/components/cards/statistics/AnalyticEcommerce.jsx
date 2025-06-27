import PropTypes from 'prop-types';
// material-ui
import Chip from '@mui/material/Chip';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Avatar from '@mui/material/Avatar';

// project imports
import MainCard from 'components/MainCard';

// assets
import RiseOutlined from '@ant-design/icons/RiseOutlined';
import FallOutlined from '@ant-design/icons/FallOutlined';

const iconSX = { fontSize: '0.75rem', color: 'inherit', marginLeft: 0, marginRight: 0 };

export default function AnalyticEcommerce({ color = 'primary', title, count, percentage, isLoss, icon }) {
  return (
    <MainCard contentSX={{ p: 2.25 }}>
      <Grid container spacing={2} alignItems="center">
        {/* Left side: Icon */}
        <Grid>
          {icon && (
            <Avatar
              sx={{
                bgcolor: `${color}.lighter`,
                color: `${color}.main`,
                width: 40,
                height: 40,
                fontSize: '1.50rem',
              }}
            >
              {icon}
            </Avatar>
          )}
        </Grid>
        {/* Right side: Title, Count, Percentage */}
        <Grid>
          <Stack sx={{ gap: 0.5 }}>
            <Typography variant="h6" color="text.secondary">
              {title}
            </Typography>
            <Grid container alignItems="center">
              <Grid>
                <Typography variant="h4" color="inherit">
                  {count}
                </Typography>
              </Grid>
              {percentage && (
                <Grid>
                  <Chip
                    variant="combined"
                    color={color}
                    icon={isLoss ? <FallOutlined style={iconSX} /> : <RiseOutlined style={iconSX} />}
                    label={`${percentage}%`}
                    sx={{ ml: 1.25, pl: 1 }}
                    size="small"
                  />
                </Grid>
              )}
            </Grid>
          </Stack>
        </Grid>
      </Grid>
    </MainCard>
  );
}

AnalyticEcommerce.propTypes = {
  color: PropTypes.string,
  title: PropTypes.string,
  count: PropTypes.string,
  percentage: PropTypes.number,
  isLoss: PropTypes.bool,
  icon: PropTypes.element,
};