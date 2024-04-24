interface RawHTMLBlockProps {
  code: string;
 }

const RawHTMLBlock = ({ code }: RawHTMLBlockProps) => {
    return <pre dangerouslySetInnerHTML={{ __html: code }} style={{overflowX: 'auto'}} className="bg-black text-gray-200 p-5 rounded-lg"  />;
  };

export default RawHTMLBlock