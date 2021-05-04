import { hot } from "react-hot-loader/root";

import * as Img from "./Img";
import * as Title from "./Title";
import * as Description from "./Description";
import * as Topics from "./ExtendedTopics";
import * as Videos from "./Videos";
import * as GeoLocation from "./GeoLocation";
import * as Canvas from "./Canvas";
import * as Hyperlinks from "./HyperLinks";
import * as DateTime from "./DateTime";

import * as Activity from "./Activity";

export const fieldComps: { [key: string]: any } = {
  [Title.key]: Title,
  [Description.key]: Description,
  [Img.key]: Img,
  [Videos.key]: Videos,
  [Activity.key]: Activity,
  [GeoLocation.key]: GeoLocation,
  [Hyperlinks.key]: Hyperlinks,
  [DateTime.key]: DateTime,
  [Topics.key]: Topics,
  [Canvas.key]: Canvas,
};

export const cardFields = Object.keys(fieldComps).map(k => {
  const { key, label } = fieldComps[k];
  return { key, label };
});
