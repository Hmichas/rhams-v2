import { remultNextApp } from 'remult/remult-next'
import { Artist } from "../../../shared/artist"
import { Artwork } from "../../../shared/artwork"
import { Buyer } from "../../../shared/buyer"
import { Collection } from "../../../shared/collection"
import { Edition } from "../../../shared/edition"
import { Exhibition } from "../../../shared/exhibition"
import { Media } from "../../../shared/media"
import { SalesRecord } from "../../../shared/salesrecord"
import { User } from "../../../shared/user"
import { ValueList } from "../../../shared/entutils/valuelist"
import { createPostgresDataProvider } from "remult/postgres"

const DATABASE_URL = process.env["POSTGRES_URL"]

const api = remultNextApp({
    entities: [Artist, Artwork, Buyer, Collection, Edition, 
               Exhibition, Media, SalesRecord, User, ValueList],
    admin: true,
    dataProvider: DATABASE_URL
    ? createPostgresDataProvider({ connectionString: DATABASE_URL })
    : undefined,
})

export const { POST, PUT, DELETE, GET } = api