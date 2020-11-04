import React, { Suspense } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import GridList from '@material-ui/core/GridList';
import GridListTile from '@material-ui/core/GridListTile';
import GridListTileBar from '@material-ui/core/GridListTileBar';
import IconButton from '@material-ui/core/IconButton';
import InfoIcon from '@material-ui/icons/Info';
import { Link as RouterLink } from 'react-router-dom';
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import Grid from '@material-ui/core/Grid';
import { useDishes, useBaseUrl } from '../State/confusion';
import Loading from './LoadingComponent';
import { ErrorBoundary } from "react-error-boundary";

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-around',
    overflow: 'hidden',
  },
  gridList: {
    width: 1080,
    height: 500,
  },
  icon: {
    color: 'rgba(255, 255, 255, 0.54)',
  }
}));

function MenuItems({ classes }) {

  const dishes = useDishes();
  const baseUrl = useBaseUrl();

  return(
    <GridList cellHeight={240} cols={3} className={classes.gridList}>
      { dishes.map((dish) => (
          <GridListTile key={dish.id}>
              <img src={baseUrl + dish.image} alt={dish.name} />
              <RouterLink to={`/menu/${dish.id}`}>
                  <GridListTileBar
                  title={dish.name}
                  actionIcon={
                      <IconButton aria-label={`info about ${dish.name}`} className={classes.icon}>
                      <InfoIcon />
                      </IconButton>
                  }
                  />
              </RouterLink>
          </GridListTile>
      ))}
    </GridList>
  );
}

export default function MenuList() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link color="inherit" component={RouterLink} to="/">
                    Home
                    </Link>
                    <Typography color="textPrimary">Menu</Typography>
                </Breadcrumbs>
            </Grid>
            <Grid item xs={12}>
                <Typography variant="h4" align='left' component="h4">
                Restaurant Menu
                </Typography>
            </Grid>
        </Grid>
        <ErrorBoundary
          fallbackRender={({error, componentStack, resetErrorBoundary}) => (
          <div role="alert">
              <Typography variant="h5" align='left' component="h5">
              Error
              </Typography>
              <Typography variant="body1" align='left' component="p">
              {error.message}
              </Typography>
          </div>
          )}
        >
          <Suspense fallback={<Loading message={'Loading Dishes'} />}>
            <MenuItems classes={classes} />
          </Suspense>
        </ErrorBoundary>
    </div>
  );
}