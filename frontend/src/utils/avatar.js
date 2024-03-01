export const profileHead = (kaChatKo, width = '45px', height = '45px', fontSize = 18, borderRadius = '50%') => {

    return kaChatKo.avatar ? <img
        src={kaChatKo.avatar?.url}
        alt=''
        style={{ width, height }}
        className='rounded-circle'
    /> :
        <div className='d-flex align-content-center justify-content-center' style={{ width, height, borderRadius, backgroundColor: 'lightblue', marginTop: -5 }}>
            <span style={{ fontSize, alignItems: 'center', display: 'flex' }}>
                <span>  {kaChatKo.firstname.charAt(0)}{kaChatKo.lastname.charAt(0)}</span>
            </span>
        </div >
}