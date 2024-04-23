
const Img = ({ url, caption }) => {
    return (
        <div>
            <img src={url} alt="image-of-blog" />
            {
                caption.length ? <p className="w-full text-center my-3 md:mb-12 text-base text-gray-700" style={{ overflowX: 'auto' }}>{caption}</p> : ''
            }
        </div>
    )
}

export default Img