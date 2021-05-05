import { Img } from '~/constants/typeUtils';
export default interface DataElem {
  id: string;
  img: Img;
  title: string;
  count: number;
  cards?: any[]
}
