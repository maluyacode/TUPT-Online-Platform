export const profileHead = (kaChatKo, width = '45px', height = '45px', fontSize = 18, borderRadius = '50%') => {

    return kaChatKo?.avatar ? <img
        src={kaChatKo?.avatar?.url}
        alt=''
        style={{ width, height, borderRadius }}
    // className='rounded-circle'
    /> :
        <div className='d-flex align-content-center justify-content-center' style={{
            width, height, borderRadius, backgroundColor: 'lightblue',
            // marginTop: -5
        }}>
            <span style={{ fontSize, alignItems: 'center', display: 'flex' }}>
                <span>  {kaChatKo?.firstname?.charAt(0)}{kaChatKo?.lastname?.charAt(0)}</span>
            </span>
        </div >
}

export const colorCoding = (role) => {
    if (role === 'parent') {
        // Darker shade of blue
        return '#6487C8';
    } else if (role === 'student') {
        // Darker shade of orange
        return '#D5A76A';
    } else if (role === 'teacher') {
        // Darker shade of green
        return '#7EBF8A';
    }
}

