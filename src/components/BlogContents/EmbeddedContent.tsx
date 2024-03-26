

const EmbeddedContent = ({ embed, width, height, caption }) => {
    return (
        <div className="embedded-content flex justify-center">
            <iframe
                title="Embedded Content"
                width={width}
                height={height}
                src={embed}
                frameBorder="0"
                allowFullScreen
            />
            {
                caption.length ? <p className="w-full text-center my-3 md:mb-12 text-base text-gray-700">{caption}</p> : ''
            }
        </div>
    );
}

export default EmbeddedContent