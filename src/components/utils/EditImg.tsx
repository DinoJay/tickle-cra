import React, { useState } from "react";

import uuidv1 from "uuid/v1";

import { PhotoPreview } from "~/components/utils/PhotoUpload";

interface Url {
  url: string;
  name: string;
  id: string;
}

interface AddUrlProps {
  onChange: (a: Url) => void;
  url: string;
}

const AddUrl: React.FC<AddUrlProps> = props => {
  const { onChange, url } = props;

  const [imgUrl, setImgUrl] = useState<string>(url);

  return (
    <div className="mt-3 flex w-full border-2 ">
      <input
        className="p-2 text-lg flex-grow font-bold "
        value={imgUrl}
        placeholder="Add Image Url"
        type="url"
        onChange={e => setImgUrl(e.target.value)}
      />
      <button
        className="bg-grey text-white p-2 uppercase font-bold hover:bg-grey-dark"
        type="button"
        onClick={() =>
          onChange({
            url: imgUrl,
            name: imgUrl,
            id: uuidv1()
          })
        }
      >
        Add Url
      </button>
    </div>
  );
};

interface EditImgProps {
  url: string;
  name: string;
  className?: string;
  onChange: (a: Url) => void;
}

const EditImg: React.FC<EditImgProps> = props => {
  const { className } = props;

  return (
    <div className={`${className} flex flex-col editImg relative `}>
      <PhotoPreview className="flex-grow border mb-2" {...props} />
      <AddUrl className="hidden flex-shrink-0" {...props} />
    </div>
  );
};

export default EditImg;
