import React, { useState } from "react";

import uuidv1 from "uuid/v1";

interface AddUrlProps {
  onChange: Function;
  style?: React.CSSProperties;
  className?: string;
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

export default AddUrl;
