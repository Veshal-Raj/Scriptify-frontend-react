

const RawHTMLBlock = ({ code }) => {
    return <pre dangerouslySetInnerHTML={{ __html: code }} style={{overflowX: 'auto'}} className="bg-black text-gray-200 p-5 rounded-lg"  />;
  };

export default RawHTMLBlock