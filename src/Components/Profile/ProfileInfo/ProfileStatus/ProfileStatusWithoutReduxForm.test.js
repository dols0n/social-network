import {create} from 'react-test-renderer'
import ProfileStatusClassComponent from "./ProfileStatusClassComponent";

describe('ProfileStateWithoutReduxForm component', () => {
    test('status from props should be in the state', () => {
        let status = 'mystatus'
        const component = create(<ProfileStatusClassComponent status={status}/>)
        const instance = component.getInstance()
        expect(instance.state.status).toBe(status)
    })

    test('after creation span should be displayed with correct status', () => {
        let status = 'mystatus'
        const component = create(<ProfileStatusClassComponent status={status}/>)
        const instance = component.root
        let span = instance.findByType("span")

        expect(span.length).toBe(1)
    })
})