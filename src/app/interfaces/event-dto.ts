import { HostDto } from './host-dto';

export interface EventDto {
  id: number;
  name: string;
  startDate: Date;
  endDate: Date;
  qrCode: string;
  qrCodeData: string;
  coHosts: HostDto[];
}
