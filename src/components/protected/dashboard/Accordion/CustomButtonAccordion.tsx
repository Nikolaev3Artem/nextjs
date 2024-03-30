import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import { AccordionSummary } from '@mui/material';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { grey } from '@mui/material/colors';
import React from 'react';

// import { setAccordionOpen } from "../../../store/admin/accordion/accordionOpenSlice"
// import { useAppDispatch, useAppSelector } from "../../../store/auth/redux"
import Style from './custombuttonaccordion.module.css';

const color_title = grey[800];

interface ICustomButtonAccordionProps {
  name: string;
}
const CustomButtonAccordion = ({ name }: ICustomButtonAccordionProps) => {
  // const open = useAppSelector((state) => state.accordion.open)
  // const dispatch = useAppDispatch()
  // const toggleAccordion = () => {
  // 	dispatch(setAccordionOpen())
  // }
  return (
    <Button size={'small'} sx={{ padding: 0, height: 40 }} variant={'text'}>
      <AccordionSummary
        sx={{ margin: 0, height: 40 }}
        // expandIcon={
        //   <ExpandMoreIcon className={open ? Style.active : Style.none} />
        // }
        aria-controls="panel1a-content"
        id="panel1a-header"
        // onClick={toggleAccordion}
      >
        <Typography
          sx={{
            fontFamily: 'Inter',
            fontStyle: 'normal',
            textTransform: 'none',
            fontWeight: 300,
            fontSize: '16px',
            lineHeight: '150%',
            padding: '8px 8px',
            gap: '4px',
            color: color_title,
          }}
        >
          {name}
        </Typography>
      </AccordionSummary>
    </Button>
  );
};

export default CustomButtonAccordion;
