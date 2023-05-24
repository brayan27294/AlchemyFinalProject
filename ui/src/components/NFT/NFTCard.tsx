import React, { Dispatch, SetStateAction } from 'react';
import {
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
  IconButton,
} from '@mui/material';
import {
  Edit as EditIcon
} from '@mui/icons-material';
import { useSelector } from 'react-redux';
import { RootState } from '../../redux/store';

interface INFTCardProps {
  nft: {
    name: string;
    description: string;
  },
  editHandler: Dispatch<SetStateAction<boolean>>;
}

const NFTCard = ({nft, editHandler}:INFTCardProps) => {
  const { role } = useSelector((state: RootState) => state.config);
  return (
    <Grid item>
        <Card sx={{ maxWidth: 345 }}>
        <CardHeader
            title={nft.name}
          />
          <CardMedia
            component='img'
            height='194'
            image={require('../../assets/images/nft.png')}
            alt='NFT Certification Image'
          />
          <CardContent>
            <Typography variant='body2' color='text.secondary'>
              This impressive paella is a perfect party dish and a fun meal to cook
              together with your guests. Add 1 cup of frozen peas along with the mussels,
              if you like.{nft.description}
            </Typography>
          </CardContent>
          <CardActions disableSpacing>
            {role === 'certifier' &&
            <IconButton aria-label='Edit' onClick={() => editHandler(true)}>
              <EditIcon />
            </IconButton>
            }
          </CardActions>
        </Card>
    </Grid>
  );
}

export default NFTCard;