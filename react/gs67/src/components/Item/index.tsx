export default function ({text, color, isShow, onTg}) {
    console.log(text, color)
    return (
        <>
            {isShow && <p style={{color: color}}>{text}</p>}
            <button onClick={onTg}>{isShow ? 'Ẩn': 'Hiện'}</button>
        </>
    )
}