









export const InputStatus = (props) => {
    const {input, meta, ...restProps} = props
    return(
        <input autoFocus={true}
               {...input}
        />
    )
}