const { GEO_LOCATE_API_KEY, SENDGRID_API_KEY } = process.env;
import sgMail from "@sendgrid/mail";

// sgMail.setApiKey(SENDGRID_API_KEY as string)
export default async function handler(req: any, res: any) {
  const { device, user_info } = req.headers;
  const lat_long_res = await fetch(
    `https://www.googleapis.com/geolocation/v1/geolocate?key=${GEO_LOCATE_API_KEY}`,
    {
      method: "POST",
    }
  ).then((res) => res.json());
  const lat = lat_long_res.location.lat;
  const long = lat_long_res.location.lng;
  const location = await fetch(
    `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${long}&key=${GEO_LOCATE_API_KEY}`,
    {
      method: "POST",
    }
  ).then((res) => res.json());
  const address = location.results[0].formatted_address;
  const user_data = JSON.parse(user_info);
  const { email, full_name } = user_data;
  const device_info = {
    email: email,
    full_name: full_name,
    location: address,
    device: device,
  };
  res.json(device_info);
}
