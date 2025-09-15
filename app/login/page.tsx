import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import Link from "next/link"
import Image from "next/image"

export default function LoginPage() {
  return (
    <div className="min-h-screen flex flex-col bg-white">
      <div className="flex flex-col items-center justify-center px-6 pt-16 pb-8" style={{ backgroundColor: "#FDF7FA" }}>
        {/* Pink Bear Mascot */}
        <div className="mb-8">
          <Image src="/images/momo.png" alt="Momo mascot" width={64} height={64} className="w-16 h-16" />
        </div>

        {/* App Title */}
        <div className="text-center">
          <h1 className="text-4xl font-bold text-black mb-2" style={{ fontFamily: "var(--font-monomaniac-one)" }}>
            ももとおひっこし
          </h1>
          <h2 className="text-4xl font-bold text-black" style={{ fontFamily: "var(--font-monomaniac-one)" }}>
            へようこそ
          </h2>
        </div>
      </div>

      <div className="flex-1 flex flex-col items-center px-6 bg-white">
        {/* Login Form */}
        <div className="w-full max-w-sm space-y-6 mt-8">
          {/* User ID Field */}
          <div className="space-y-2">
            <Label htmlFor="userId" className="text-black text-base font-medium">
              ユーザーID
            </Label>
            <Input
              id="userId"
              type="text"
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black placeholder:text-gray-500"
              placeholder=""
            />
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <Label htmlFor="password" className="text-black text-base font-medium">
              パスワード
            </Label>
            <Input
              id="password"
              type="password"
              className="w-full h-12 bg-gray-200 border-0 rounded-lg text-black placeholder:text-gray-500"
              placeholder=""
            />
          </div>
        </div>

        <div className="text-center mt-12 mb-8">
          <p className="text-black text-base">ももと引越しでは、</p>
          <p className="text-black text-base">あなたの引越しをサポートします</p>
        </div>

        <div className="w-full max-w-sm mx-auto space-y-4 mt-auto pb-8">
          <Button
            className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full border-0"
            asChild
          >
            <Link href="/signup">新規登録</Link>
          </Button>

          <Button
            className="w-full h-14 bg-red-500 hover:bg-red-600 text-white text-lg font-medium rounded-full border-0"
            asChild
          >
            <Link href="/">ログイン</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
