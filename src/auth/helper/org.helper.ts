export async function codeGenerator(user) {
  const randomNumber = Math.floor(Math.random() * 900) + 100;

  const orgName = user.name;
  let code = '';

  const splitOrgName = orgName.split(' ');

  if (splitOrgName.length > 1) {
    code =
      (splitOrgName[0][0] + splitOrgName[1][0]).toUpperCase() +
      '-' +
      randomNumber;
  } else {
    code =
      (splitOrgName[0][0] + splitOrgName[0][1]).toUpperCase() +
      '-' +
      randomNumber;
  }

  return code;
}
