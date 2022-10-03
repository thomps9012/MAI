const { GEO_LOCATE_API_KEY, SENDGRID_API_KEY } = process.env
import sgMail from '@sendgrid/mail'

sgMail.setApiKey(SENDGRID_API_KEY as string)
export default async function handler(req: any, res: any) {
    const { device, user_info } = req.headers
    const lat_long_res = await fetch(`https://www.googleapis.com/geolocation/v1/geolocate?key=${GEO_LOCATE_API_KEY}`, {
        method: 'POST'
    }).then(res => res.json())
    const lat = lat_long_res.location.lat;
    const long = lat_long_res.location.lng;
    const location = await fetch(`https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GEO_LOCATE_API_KEY}`, {
        method: 'POST'
    }).then(res => res.json())
    const address = location.results[0].formatted_address;
    const user_data = JSON.parse(user_info);
    console.log(device)
    const { email, full_name, _id } = user_data
    const msg = {
        to: email,
        from: 'sthompson@norainc.org',
        subject: 'New MAI Sign In',
        html: `
        <br />
        <br />
        Sign in to Account for User:        
        <hr />
        ${full_name}
        <br />
        <br />
        Location:
        <hr />
        ${address}
        <br />
        <br />
        Device:
        <hr />
        ${device}
        <br />
        <br />
        If this was not you, reset your password
        <br /> 
        <a href='https://minority-aids-initiative.vercel.app/admin/users/${_id}'>HERE</a>
        <br />
        <br />
        If this was you, please ignore this email
        <br />
        <br />
        Sincerely,
        <br />
        The Development Team
        `
    }
    console.log(msg)
    try {
        await sgMail.send(msg);
    } catch (error) {
        console.error(error);
    }
    res.json({ response: 'successful login' })
}