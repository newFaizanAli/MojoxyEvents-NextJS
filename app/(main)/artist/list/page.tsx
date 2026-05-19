"use client";

export const dynamic = "force-dynamic";

// import {
//     useEffect,
// } from 'react'
// import { useSearchParams, useRouter } from 'next/navigation';
// import { EmptyState, Icon, SearchBar } from '@/app/components/shared';
// import { ArtistCard } from '@/app/components/pages/artist';
// import { Button } from '@/app/components/ui';
// import { useArtistStore, useCategoryStore } from '@/app/store';
// import Link from 'next/link';
// import { ROUTES_PATHS } from '@/app/utilities/page_routes';
import { H1 } from '@/app/components/shared/Typography';


const ArtistListPage = () => {
    // const { fetchArtists, artists } = useArtistStore();
    // const { fetchCategories, categories } = useCategoryStore();
    // const router = useRouter();
    // const searchParams = useSearchParams()

    // const search = searchParams.get("search") ?? "";
    // const category = searchParams.get("category") ?? "";


    // useEffect(() => {
    //     fetchArtists(search, category);
    // }, [search, category, fetchArtists]);

    // useEffect(() => {
    //     fetchCategories()
    // }, [])



    return (
        <div style={{ maxWidth: 1200, margin: "0 auto", padding: "40px 24px" }}>
            {/* Header */}
            <div className="mb-9 space-y-2">
                <H1 useTiltNeon>All Artists</H1>
                {/* <p className="text-gray-500 text-base">
                    Discover {artists.length} world-class performers
                </p> */}
            </div>

            {/* Filters */}
            <div className="flex align-items-center flex-wrap gap-4 mb-4">
                {/* <div className="flex-1 max-w-full">
                    <SearchBar
                        placeholder="Search artists..."
                        onSearch={(value) => {
                            const params = new URLSearchParams(searchParams.toString());

                            if (value) {
                                params.set("search", value);
                            } else {
                                params.delete("search");
                            }

                            router.push(`?${params.toString()}`);
                        }}
                    />
                </div> */}

                {/* <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                    {genres.map(g => (
                        <button key={g} onClick={() => setFilter(g)} style={{
                            padding: "8px 16px", borderRadius: "var(--radius-full)", fontSize: 13, fontWeight: 600,
                            background: filter === g ? "var(--primary)" : "var(--white)",
                            color: filter === g ? "var(--white)" : "var(--gray-600)",
                            border: filter === g ? "none" : "1.5px solid var(--gray-200)",
                            cursor: "pointer", transition: "all 0.15s",
                        }}>
                            {g}
                        </button>
                    ))}
                </div> */}

                {/* <div>
                    <select
                        value={category}
                        style={{ width: "auto", padding: "9px 14px" }}
                        onChange={(e) => {
                            const value = e.target.value;
                            const params = new URLSearchParams(searchParams.toString());

                            if (value) {
                                params.set("category", value);
                            } else {
                                params.delete("category");
                            }

                            router.push(`?${params.toString()}`);
                        }}
                    >
                        <option value="">Select Category</option>
                        {categories.map((category) => (
                            <option key={category._id} value={category._id}>
                                {category.name}
                            </option>
                        ))}
                    </select>
                </div> */}

            </div>

            {/* Results Info */}
            {/* <div className="flex items-center justify-between mb-5">

                <p className="text-sm text-gray-500">
                    Showing{" "}
                    <strong className="text-gray-900">
                        {artists.length}
                    </strong>{" "}
                    artists
                </p>

                <div className="flex gap-1">
                    <button className="p-1.5 rounded-sm border-[1.5px] border-gray-200 bg-white cursor-pointer">
                        <Icon name="grid" size={16} color="var(--primary)" />
                    </button>
                </div>

            </div> */}
            {/* Grid */}
            {/* {artists.length === 0 ? (
                <EmptyState icon="search" title="No artists found" description="Try adjusting your filters or search terms."
                    action={<Button>Clear Filters</Button>} />
            ) : (
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {artists.map((artist, idx) => (
                        <Link href={ROUTES_PATHS.PUBLIC.ARTIST.PROFILE(artist._id as string)} key={idx}>
                            <ArtistCard key={idx} artist={artist} />
                        </Link>
                    ))}
                </div>
            )} */}
        </div>
    );
};

export default ArtistListPage
