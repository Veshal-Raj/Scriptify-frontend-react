

const CodeBlock = ({ code }) => {
    return (
        <pre className="bg-gray-100 p-4 rounded-md w-auto " style={{overflowX: 'auto'}}>
            <code>{code}</code>
        </pre>
    );
};

export default CodeBlock