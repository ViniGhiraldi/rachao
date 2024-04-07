'use server'

import { revalidateTag } from "next/cache"

export const revalidateTagOnServer = (tag: string) => revalidateTag(tag);