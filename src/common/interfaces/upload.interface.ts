/**
 * Интерфейс загруженного файла
 */
export interface IUpload {
  /**
   * ID файла
   */
  readonly _id: string
  /**
   * Ссылка на файл
   */
  url: string

  /**
   * Ключ файла
   */
  key: string

  /**
   * Имя файла
   */
  name: string

  /**
   * Расширение файла
   */
  ext: string

  /**
   * Владелец файла
   */
  owner: string
}
