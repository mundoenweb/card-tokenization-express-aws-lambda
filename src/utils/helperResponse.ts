
export const helperResponse = (
  res: any, data: any, code: number, message: string = 'consulta exitosa'
): void => {
  const response = { data, message, status: code }

  res.status(code)
  res.json(response)
}
