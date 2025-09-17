'use client';

import dayjs from 'dayjs';
import { useEffect, useState } from 'react';
import { Socket, io } from 'socket.io-client';

import { Wrapper } from '@/components/wrapper';

const KOSPI = '0001';
const KOSDAQ = '1001';

interface IProps {
  tr_id?: string;
  tr_key?: string;
  symbolName?: string;
}

export default function BestWeekend(props: IProps) {}
