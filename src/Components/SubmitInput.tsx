'use client'
const SubmitInput = (props: any) => {
  return (
    <div>
      <div className="relative">
        {props.id != "message" ? (
          <input
            type="text"
            id={props.id}
            value={props.value}
            onChange={(e) => props.handleChange(props.id, e.target.value)}
            className={`block px-4 pb-3 pt-5 w-full text-lg rounded-md text-[#6A3502] bg-[#F7F3E9] border-[2px] border-[#877337] appearance-none shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#877337] focus:border-[#877337] ${props.error ? "border-red-500" : ""
              }`}
            placeholder=""
          />
        ) : (
          <textarea
            value={props.value}
            name={props.id}
            id={props.id}
            onChange={(e) => props.handleChange(props.id, e.target.value)}
            rows={4}
            className={`block px-4 pb-3 pt-5 w-full text-lg rounded-md text-[#6A3502] bg-[#F7F3E9] border-[2px] border-[#877337] appearance-none shadow-md hover:shadow-lg focus:shadow-lg focus:outline-none focus:ring-2 focus:ring-[#877337] focus:border-[#877337] ${props.error ? "border-red-500" : ""
              }`}
            placeholder=""
          ></textarea>
        )}
        <label
          htmlFor={props.id}
          className={`absolute text-lg text-[#6A3502] bg-[#F7F3E9] px-2 transition-all duration-300 transform -translate-y-3 scale-90 top-1 left-2 z-10 peer-focus:scale-90 peer-focus:-translate-y-3 peer-placeholder-shown:translate-y-4 peer-placeholder-shown:scale-100 rtl:peer-placeholder-shown:right-2 rtl:peer-placeholder-shown:left-auto`}
        >
          {props.name}
        </label>
      </div>
      {props.error && (
        <div className="text-red-500 text-sm ml-1 mt-1">
          {props.error}
        </div>
      )}
    </div>
  );
};

export default SubmitInput;
