import EmptyView from "@/components/empty-view";
import usePassword from "@/stores/password";
import { AnimatePresence, motion } from "motion/react";
import PasswordSearchForm from "./password-search-form";
import SavedPassword from "./saved-password";
import { useState } from "react";

const SavedPasswordsPage = () => {
	const savedPasswords = usePassword((state) => state.savedPasswords);
	const [search, setSearch] = useState("");
	const filteredPasswords = savedPasswords.filter((p) =>
		p.title.includes(search)
	);
	return (
		<section>
			<header>
				<h1 className="text-2xl font-semibold pt-7 pb-5 text-center">
					Saved Passwords
				</h1>
			</header>
			<PasswordSearchForm setValue={setSearch} />
			{savedPasswords.length > 0 ? (
				<>
					{filteredPasswords.length > 0 ? (
						<section className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 py-7 gap-7">
							<AnimatePresence>
								{filteredPasswords.map((p, index) => (
									<motion.div
										layout
										key={p.id}
										initial={{ opacity: 0 }}
										animate={{ opacity: 1 }}
										transition={{
											duration: 0.25,
											delay: index / 10,
										}}
										exit={{ opacity: 0 }}
									>
										<SavedPassword
											id={p.id}
											hashedPassword={p.hashedPassword}
											title={p.title}
										/>
									</motion.div>
								))}
							</AnimatePresence>
						</section>
					) : (
						<motion.div
							initial={{ opacity: 0 }}
							animate={{ opacity: 1 }}
							transition={{ duration: 0.5 }}
						>
							<EmptyView>There is no password with this title</EmptyView>
						</motion.div>
					)}
				</>
			) : (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					transition={{ duration: 0.5 }}
				>
					<EmptyView>Your Saved Password List is Empty</EmptyView>
				</motion.div>
			)}
		</section>
	);
};
export default SavedPasswordsPage;
